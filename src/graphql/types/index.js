import { mergeSchemas } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  extensions: ["gql", "graphql"],
});

export default mergeSchemas({ typeDefs: typesArray });
