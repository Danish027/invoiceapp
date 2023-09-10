import getCurrentUser from "@/actions/getCurrentUser";
import ClientDashboard from "./ClientDashboard";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";

const Home = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    return (
      <div className="w-full h-screen">
        <EmptyState
          title="Unauthorized"
          subtitle="Please log in to access your dashboard."
          showButton
        />
      </div>
    );
  }
  return <ClientDashboard currentUser={currentUser} />;
};

export default Home;
