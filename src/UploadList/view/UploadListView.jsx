const UploadListView = ({ list, Comp, ...rest }) => {
  return (
    <div style={{ margin: 20 }}>
      {list.map((item) => (
        <Comp item={item} key={item.id} {...rest} />
      ))}
    </div>
  );
};

export default UploadListView;
