import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class Posts extends React.Component {
    render() {
        const {className, posts, showPost} = this.props;
        return (
            <Grid item xs={6}>
                {posts.map(post =>
                    <Paper
                        className={className}
                        onClick={() => {
                            showPost(post)
                        }}
                        key={post.id}
                    >{post.title}</Paper>
                )}
            </Grid>
        )
    }
}

export default Posts;