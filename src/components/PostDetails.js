import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const Loader = require('react-loader');

class PostDetails extends React.Component {

    state = {
        user: null,
        comment: null,
        loaded: false
    };

    loadUser(userId) {
        fetch('https://jsonplaceholder.typicode.com/users/' + userId)
            .then(response => response.json())
            .then(data => this.setState({user: data, loaded: true}));

    }

    loadComments(postId) {
        this.setState({loaded: false});
        fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
            .then(response => response.json())
            .then(data => this.setState({comment: data, loaded: true}));
    }

    componentDidMount() {
        this.loadUser(this.props.post.userId);
        this.loadComments(this.props.post.id);
    }

    componentDidUpdate(prevProps) {
        const {userId, id} = this.props.post;
        if (userId !== prevProps.post.userId) {
            this.loadUser(userId);
        }
        if (id !== prevProps.post.id) {
            this.loadComments(id);
        }

    }


    render() {
        const {className, post} = this.props;
        return (
            <Grid item xs={6}>
                <Loader loaded={this.state.loaded}>
                    <Card className={className}>
                        <CardHeader title={post.title}/>
                        <CardContent>
                            <Box variant="body2" color="textSecondary" component="p">
                                {post.body}
                            </Box>
                            {this.state.user ?
                                <Typography variant="overline" component="p">
                                    Author: {this.state.user.name}<br/>
                                    Email: {this.state.user.email}<br/>
                                    Website: {this.state.user.website}
                                </Typography>
                                : null}
                        </CardContent>
                    </Card>
                    <Box variant="body2" textAlign='center' color="textSecondary" component="p">Comments</Box>
                    {this.state.comment ?
                        this.state.comment.map(com => {
                            return (
                                <Paper className={className} key={com.id}>{com.body}</Paper>
                            )
                        })
                        : null
                    }
                </Loader>
            </Grid>
        )
    }
}

export default PostDetails;