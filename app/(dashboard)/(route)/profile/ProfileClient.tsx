import Header from "@/components/customeUI/mainPageUI/Header";
import { ToggleTabs } from "@/components/customeUI/dashboardUI/ToggleTabs";
import { SafeUser } from "@/schema/type";

const ProfileClient = () => {
  return (
    <div className="min-h-screen">
      <Header dashboard label="Profile" />
      <div className="p-4">
        <ToggleTabs />
      </div>
    </div>
  );
};

export default ProfileClient;
