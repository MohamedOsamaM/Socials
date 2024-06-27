import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SinglePost({ postdetail }: any) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const contentInput = form.elements.namedItem('content') as HTMLInputElement;

        let creatCommentData = {
            "content": contentInput.value,
            "post": `${postdetail.id}`
        };

        let res = await fetch('https://linked-posts.routemisr.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('usertoken')}`
            },
            body: JSON.stringify(creatCommentData)
        });

        if (!res.ok) {
            console.error('Network response was not ok', res.statusText);
            return;
        }

        let data = await res.json();
        console.log(data);
    }

    return (
        <Card className='w-[300px]' sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={postdetail.user.photo} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={postdetail.user.name}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={postdetail.image}
                alt="Paella dish"
                className='h-[200px]'
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" className='line-clamp-1'>
                    {postdetail.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <form className='mb-3' onSubmit={HandleSubmit}>
                        <div className='flex flex-row h-12 gap-3'>
                            <input type="text" className='border-orange-500 border-2 focus:border-orange-500 outline-none rounded-lg w-[90%] px-3' name='content' /> 
                            <button className='rounded-lg w-fit p-2 bg-orange-500 text-white text-sm'>add comment</button>
                        </div>
                    </form>
                    {postdetail?.comments.map((comment: any) =>
                        <Box key={comment._id} className='bg-[#f1f1f1] p-[5px] rounded-[10px] m-[2px]'>
                            <Box className="flex items-center">
                                <Avatar className='w-[30px] h-[30px]' src={comment.commentCreator.photo}></Avatar>
                                <h5 className='ml-[6px]'>{comment.commentCreator.name}</h5>
                            </Box>
                            <Typography paragraph>{comment.content}</Typography>
                        </Box>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}