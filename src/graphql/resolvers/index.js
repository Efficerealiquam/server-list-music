import foldersResolvers from "./folders";
import songResolvers from "./song";

export default {
  Query: {
    ...foldersResolvers.Query,
    ...songResolvers.Query,
  },
  Mutation: {
    ...foldersResolvers.Mutation,
    ...songResolvers.Mutation,
  },
};
