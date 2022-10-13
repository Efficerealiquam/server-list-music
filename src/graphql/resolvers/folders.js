import { AuthenticationError, UserInputError } from "apollo-server";
import { Folders, Song } from "../../models/index";
import moment from "moment";
export default {
  Query: {
    getFoldersByID: async (_, { foldersID }) => {
      const errors = {};
      if (foldersID.trim() === "") {
        errors.foldersID = "Ingrese el ID";
        throw new UserInputError("Name must not be empty", { errors });
      }
      const bind = await Folders.findById({ _id: foldersID });
      if (bind) {
        return bind;
      } else {
        throw new AuthenticationError("No existe esta carpeta");
      }
    },
    getAllFolders: async (_, __) => {
      try {
        const folders = await Folders.find();
        return folders;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createFolders: async (_, { genderName }) => {
      const errors = {};
      /* Validate */
      if (genderName.trim() === "") {
        errors.genderName = "Ingrese un nombre";
        throw new UserInputError("Name must not be empty", { errors });
      }
      /* Create new Bind */
      const newBind = await Folders({
        genderName,
        createdAt: moment().format(),
      }).save();

      return newBind;
    },
    updateFolders: async (_, { foldersID, genderName }) => {
      const errors = {};
      /* Validate */
      if (genderName.trim() === "") {
        errors.genderName = "Ingrese un nombre";
        throw new UserInputError("Name must not be empty", { errors });
      }

      const updateBind = await Folders.findOneAndUpdate(
        { _id: foldersID },
        { genderName },
        { new: true }
      );

      return updateBind;
    },
    deleteFolders: async (_, { foldersID }) => {
      try {
        /* Borra la carpeta */
        const deleteFolders = await Folders.findByIdAndDelete({
          _id: foldersID,
        });
        /* Borra todas las canciones de la carpeta */
        await Song.deleteMany({ folders: foldersID });
        if (deleteFolders) {
          return "Bind deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
