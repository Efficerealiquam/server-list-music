import { AuthenticationError, UserInputError } from "apollo-server";
import { Song } from "../../models/index";
import moment from "moment";

export default {
  Query: {
    getAllSongs: async (_, { foldersID, typeSort }) => {
      try {
        const song = await Song.find({ folders: foldersID }).sort(typeSort);
        if (song.length === 0) {
          const errors = {};
          errors.songAll = "Actualmente no hay canciones";
          throw new UserInputError("Actualmente no hay canciones", errors);
        } else {
          return song;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getSongByID: async (_, { songID }) => {
      const errors = {};
      if (songID.trim() === "") {
        errors.songID = "Ingrese el ID";
        throw new UserInputError("ID must empty", { errors });
      }
      const song = await Song.findById({ _id: songID });
      if (!song) throw new AuthenticationError("No existe la cancion");
      return song;
    },
  },
  Mutation: {
    createSong: async (_, { foldersID, songName }) => {
      const errors = {};
      /* Validate */
      if (songName.trim() === "") {
        errors.songName = "Ingrese el nombre de la canción";
        throw new UserInputError("Name must not be empty", { errors });
      }

      /* Verificar si existe una primera cancion  */
      const findSong = await Song.find({ folders: foldersID })
        .sort({ createdAt: -1 })
        .limit(1);

      /* Si es que no hay una cancion en la carpeta creada en entra en el IF,
        pero si ya existe una cancion en la carpeta se entra en el ELSE */
      if (!findSong[0]) {
        const newSong = await Song({
          folders: foldersID,
          numberSong: 1,
          nameSong: songName,
          createdAt: moment().format(),
        }).save();
        return newSong;
      } else {
        /* Numero de la lista de la cancion para asignar*/
        const numberSong = findSong[0].numberSong + 1;
        /* creacion de una nueva cancion */
        const newSong = await Song({
          folders: foldersID,
          numberSong,
          nameSong: songName,
          createdAt: moment().format(),
        }).save();
        return newSong;
      }
    },
    updateSong: async (_, { songID, songName }) => {
      const errors = {};
      /* Validate */
      if (songName.trim() === "") {
        errors.songName = "Ingrese el nuevo nombre";
        throw new UserInputError("Name must not be empty", { errors });
      }

      const updateSong = await Song.findOneAndUpdate(
        { _id: songID },
        { nameSong: songName },
        { new: true }
      );

      return updateSong;
    },
    deleteSong: async (_, { songID }) => {
      try {
        /* Borra la carpeta */
        const deleteSong = await Song.findByIdAndDelete({
          _id: songID,
        });
        /* Borra todas las canciones de la carpeta */
        if (deleteSong) {
          return "Song deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
