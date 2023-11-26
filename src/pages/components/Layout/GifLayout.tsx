import Gif from '../Gif';

const GifLayout = ({ gifs, isDetails }) => {
  const classes: string = 'api-items' + (isDetails ? ' half' : '');
  return (
    <section className={classes}>
      {gifs.length ? (
        gifs.map((item) => (
          <Gif gif={item} key={item.id} isDetails={isDetails} />
        ))
      ) : (
        <h2>Sorry, there is nothing to show you :(</h2>
      )}
    </section>
  );
};
export default GifLayout;
