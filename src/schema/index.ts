import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { ImageResolver } from "./image";
import { HouseResolver } from "./house";
import { authChecker } from "./auth";
@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return `Hello ${process.env.NODE_ENV}`;
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, ImageResolver, HouseResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
