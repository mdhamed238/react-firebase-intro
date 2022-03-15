

const Post = ({title, body, onDelete}) => {
    return (
        <div className="card col-8">
            <div className="card-header">
                {title}
            </div>
            <div className="card-body">
                {body}
            </div>
            <button className="btn btn-danger w-25" onClick={onDelete}>Delete</button>
        </div>
    );
}

export default Post;