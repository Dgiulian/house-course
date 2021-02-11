import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from "type-graphql";
import { Min, Max } from "class-validator";
import { getBoundsOfDistance } from "geolib";
import { Context, AuthorizedContext } from "./context";

@InputType()
class CoordinatesInput {
  @Field((_type) => Float)
  @Min(-90)
  @Max(90)
  latitude!: number;

  @Field((_type) => Float)
  @Min(-180)
  @Max(180)
  longitude!: number;
}
@InputType()
class HouseInput {
  @Field((_type) => String)
  address!: string;
  @Field((_type) => String)
  image!: string;
  @Field((_type) => CoordinatesInput)
  coordinates!: CoordinatesInput;
  @Field((_type) => Int)
  bedrooms!: number;
}
@ObjectType()
class House {
  @Field((_type) => ID)
  id!: number;
  @Field((_type) => String)
  userId!: string;
  @Field((_type) => Float)
  latitude!: number;
  @Field((_type) => Float)
  longitude!: number;
  @Field((_type) => String)
  address!: string;
  @Field((_type) => String)
  image!: string;
  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split("/");
    return parts[parts.length - 1];
  }

  @Field((_type) => Int)
  bedrooms!: number;
}
@Resolver()
export class HouseResolver {
  @Mutation((_returns) => House, { nullable: true })
  @Authorized()
  async createHouse(
    @Arg("input") input: HouseInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const { prisma } = ctx;
    return prisma.house.create({
      data: {
        userId: ctx.uid,
        address: input.address,
        image: input.image,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
  }
}
