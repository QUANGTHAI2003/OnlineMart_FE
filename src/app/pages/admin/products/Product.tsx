import postApi from "@app/api/post";
import { Avatar, Button, List, Skeleton } from "antd";
import { useEffect, useState } from "react";

interface IDataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;

const Product = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataType[]>([]);
  const [list, setList] = useState<IDataType[]>([]);

  useEffect(() => {
    postApi
      .getAll({
        results: count,
        inc: "name,gender,email,nat,picture",
        noinfo: true,
      })
      .then((res) => {
        setData(res.results);
        setList(res.results);
        setInitLoading(false);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    postApi
      .getAll({
        results: count,
        inc: "name,gender,email,nat,picture",
        noinfo: true,
      })
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key="list-loadmore-edit">edit</a>,
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key="list-loadmore-more">more</a>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={item.name?.last}
              description={item.name?.first + " " + item.name?.last}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Product;
