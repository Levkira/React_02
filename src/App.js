import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Posts from './components/Posts';
import PostDetails from "./components/PostDetails";
const Loader = require('react-loader');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
});

class App extends React.Component {
    state = {
        posts: [],
        currPost: null,
        loaded: false
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => this.setState({posts: data, loaded: true}));

    }

    showPost = post => {
        this.setState({
            currPost: post
        })
    };

    render() {
        const {posts, currPost} = this.state;
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="md">
                    <h1>Posts</h1>
                    <Loader loaded={this.state.loaded}>
                        <Grid container spacing={3}>
                            <Posts showPost={this.showPost} posts={posts} className={classes.paper}/>
                            {(currPost) ? <PostDetails post={currPost} className={classes.paper}/> : null}
                        </Grid>
                    </Loader>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
