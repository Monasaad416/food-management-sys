
import Header from '../../Shared/Header/Header'
import recipiesHeader from "../../../assets/imgs/recipies-header.png";

export default function UsersList() {
  return (
    <div>
      <Header
        strong="Users"
        title="List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSrc={recipiesHeader}
        width={170}
      />
      UsersList
    </div>
  );
}
