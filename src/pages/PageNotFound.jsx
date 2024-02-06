
import Layout from "../components/layout/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="text-center mt-5">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">The requested page could not be found.</p>
        <p className="font-weight-bold">Please check the URL and try again.</p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
