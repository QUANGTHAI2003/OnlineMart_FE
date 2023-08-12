import EditEmail from "./profile/EditEmail";
import EditPassword from "./profile/EditPassword";
import EditPhone from "./profile/EditPhone";
const Account = () => {
  return (
    <div className="flex flex-col gap-4">
      <EditPhone></EditPhone>
      <EditEmail></EditEmail>
      <EditPassword></EditPassword>
    </div>
  );
};

export default Account;
