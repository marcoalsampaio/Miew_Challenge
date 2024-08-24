
interface DashboardProps {
    loggedIn: boolean;
    setLoggedIn: (value: boolean)=> void
  }

export default function Dashboard({loggedIn, setLoggedIn}:DashboardProps) {

  return (
    <>
        DASHBOARD
    </>
  );
}
