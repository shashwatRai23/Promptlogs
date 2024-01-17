import "@styles/globals.css";
import Nav from "@Components/Nav";
import Provider from "@Components/Provider";

export const metadata = {
  title: "Promptlogs",
  description: "Discover and Share AI Prompts",
};

const rootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default rootLayout;
