import "../css/Post.css";

function MainTitle({ title, right }) {
    return (
        <div className="title">
            <div>{title}</div>
            <div className="each-row">{right}</div>
        </div>
    );
}
export default MainTitle;