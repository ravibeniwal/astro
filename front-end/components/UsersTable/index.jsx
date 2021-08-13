import { Table, Tag, Space, Spin, message, Badge } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchCustomersAction,
  deleteCustomerAction,
} from "../../store/actions/authActions";
import moment from "moment";

export default function UsersTable({ showSection }) {
  const dispatch = useDispatch();
  const [fetchCustomerLoader, setfetchCustomerLoader] = useState(false);
  const [customers, setCustomers] = useState([]);

  const deleteCustomer = (customer) => {
    dispatch(
      deleteCustomerAction({ email: customer?.email }, (data) => {
        if (data?.message === "User deleted successfully") {
          fetchCustomers();
          message.success("Customer deleted successfully");
        }
      })
    );
  };

  const fetchCustomers = () => {
    const recentUsers = showSection === "RecentUsers";
    setfetchCustomerLoader(true);
    dispatch(
      fetchCustomersAction({ recentUsers }, (data) => {
        setCustomers(data);
        setfetchCustomerLoader(false);
      })
    );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const getColumns = () => {
    let columns = [];
    if (showSection === "AllUsers") {
      columns = [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render: (text) => <a>{text}</a>,
        },

        {
          title: "Role",
          dataIndex: "role",
          key: "role",
        },
        {
          title: "Created Date",
          dataIndex: "creationDate",
          key: "creationDate",
          render: (date) => (
            <>
              <Tag color="volcano" key="volcano">
                {moment(date).format("LL")}
              </Tag>
            </>
          ),
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => deleteCustomer(record)}>Delete</a>
            </Space>
          ),
        },
      ];
    } else {
      columns = [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render: (text) => <a>{text}</a>,
        },

        {
          title: "Last Login Date",
          dataIndex: "lastloginDate",
          key: "lastloginDate",
          render: (date) => (
            <>
              {}
              <Tag color={date ? "gold" : "lime"} key="volcano">
                {date ? <>{moment(date).format("LL")}</> : "Not yet logged in"}
              </Tag>
            </>
          ),
        },
        {
          title: "Login count",
          dataIndex: "loginCount",
          key: "loginCount",
          render: (count) => (
            <>
              <Tag color="blue" key="volcano">
                {count > 3 && <Badge status="processing" />}
                {count ? `${count} times` : "_"}
              </Tag>
            </>
          ),
        },
        {
          title: "Last Login Time",
          dataIndex: "lastloginDate",
          key: "lastloginDate",
          render: (date) => (
            <>
              <Tag color="green" key="volcano">
                {moment(date).format("h:mm a")}
              </Tag>
            </>
          ),
        },
      ];
    }
    return columns;
  };

  return (
    <div>
      <h2>Users are here</h2>
      <Spin spinning={fetchCustomerLoader}>
        <Table columns={getColumns()} dataSource={customers} />
      </Spin>
    </div>
  );
}
UsersTable.propTypes = {
  /**
   * @setShowSection paramType {func}- is the setState  function from parent component
   */
  setShowSection: PropTypes.func,
  /**
   * @showSection paramType {string}- is the state  from parent component for displaying section in forecast page
   */
  showSection: PropTypes.string,
};
