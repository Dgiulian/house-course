import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";
import { DeleteHouse, DeleteHouseVariables } from "src/generated/DeleteHouse";

interface IProps {
  house: {
    id: string;
    userId: string;
  };
}
const DELETE_HOUSE_MUTATION = gql`
  mutation DeleteHouse($id: String!) {
    deleteHouse(id: $id)
  }
`;

function HouseNav({ house }: IProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [deleteHouse, { loading }] = useMutation<
    DeleteHouse,
    DeleteHouseVariables
  >(DELETE_HOUSE_MUTATION);
  const canManage = !!user && user.uid === house.userId;

  const handleDeleteHouse = async (id: string) => {
    if (confirm("Are you sure to delete the house?")) {
      await deleteHouse({ variables: { id } });
      router.push("/");
    }
  };
  return (
    <>
      <Link href="/">
        <a>Map</a>
      </Link>
      {canManage && (
        <>
          {" | "}
          <Link href={`/houses/${house.id}/edit`}>
            <a>Edit</a>
          </Link>
          {" | "}
          <button
            disabled={loading}
            type="button"
            onClick={() => handleDeleteHouse(house.id)}
          >
            <a>Delete</a>
          </button>
        </>
      )}
    </>
  );
}
export default HouseNav;
