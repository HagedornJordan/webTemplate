import CenterLayout from "../components/centerLayout";
import NavHeader from "../components/navHeader";
import { sendRequest } from "../helpers/axios";
const AdminDashboard = (props) => {
  return (
    <>
      <NavHeader user={props.user} />
      <CenterLayout>
        <table>
          <tr>
            <th> Log ID </th>
            <th> Time</th>
            <th> User ID</th>
            <th> request URL </th>
          </tr>
          {props.logs.map((log) => {
            return (
              <>
                <tr>
                  <td>{log.id}</td>
                  <td>{log.time}</td>
                  <td>{log.userId}</td>
                  <td>{log.request}</td>
                </tr>
              </>
            );
          })}
        </table>
      </CenterLayout>
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await sendRequest("http://localhost:3000/requestLogs", "get");
  const logs = res.data;
  return {
    props: {
      logs,
    },
  };
}

export default AdminDashboard;
