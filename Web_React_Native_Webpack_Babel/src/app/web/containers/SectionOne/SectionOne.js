import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});


const tileData = [
    {
        img: '/static/images/grid-list/breakfast.jpg',
        title: 'Breakfast',
        author: 'jill111',
        cols: 2,
        featured: true,
    },
    {
        img: '/static/images/grid-list/burgers.jpg',
        title: 'Tasty burger',
        author: 'director90',
    },
    {
        img: '/static/images/grid-list/camera.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: '/static/images/grid-list/morning.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
    },
    {
        img: '/static/images/grid-list/hats.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: '/static/images/grid-list/honey.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: '/static/images/grid-list/vegetables.jpg',
        title: 'Vegetables',
        author: 'jill111',
        cols: 2,
    },
    {
        img: '/static/images/grid-list/plant.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
    {
        img: '/static/images/grid-list/mushroom.jpg',
        title: 'Mushrooms',
        author: 'PublicDomainPictures',
    },
    {
        img: '/static/images/grid-list/olive.jpg',
        title: 'Olive oil',
        author: 'congerdesign',
    },
    {
        img: '/static/images/grid-list/star.jpg',
        title: 'Sea star',
        cols: 2,
        author: '821292',
    },
    {
        img: '/static/images/grid-list/bike.jpg',
        title: 'Bike',
        author: 'danfador',
    },
];





function TitlebarGridList(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);