export interface INomatchProps {}

const NoMatch: React.FunctionComponent<INomatchProps> = (props) => {
  return (
    <div className="container">
      <h1>404: page not found</h1>;
    </div>
  );
};

export default NoMatch;
