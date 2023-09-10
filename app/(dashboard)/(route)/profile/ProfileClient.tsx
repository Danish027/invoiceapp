import Header from "@/components/customeUI/mainPageUI/Header";
import { ToggleTabs } from "@/components/customeUI/dashboardUI/ToggleTabs";
import { SafeUser } from "@/schema/type";

interface ProfileClientProps {
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  return (
    <div className="min-h-screen">
      <Header dashboard label="Profile" currentUser={currentUser} />
      <div className="p-4">
        <ToggleTabs currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ProfileClient;
