import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import { UserProvider } from "../context/UserContext";

function RootLayout({ handlerKeyword }) {
  return (
    <UserProvider>
      <div className="container">
        <Header handlerKeyword={handlerKeyword} />
        <main className="main">
          <Card>
            <Outlet />
          </Card>
        </main>
      </div>
    </UserProvider>
  );
}

export default RootLayout;
