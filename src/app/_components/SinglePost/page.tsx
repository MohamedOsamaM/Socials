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
    const [usernames, setUsernames] = React.useState(localStorage.getItem('username'));
    const [expanded, setExpanded] = React.useState(false);
    const [commentid, setCommentid] = React.useState<string | null>(null);
    const [commentContainer, setCommentContainer] = React.useState<any>(postdetail?.comments);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const postComments = async (pID: number) => {
        const token = localStorage.getItem('usertoken');
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            token: token ? String(token) : '', // Convert token to string or provide a default value
        };
        const res = await fetch(`https://linked-posts.routemisr.com/posts/${pID}/comments`, {
            method: 'GET',
            headers,
        });
        const data = await res.json();
        setCommentContainer(data.comments);
    }
    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const contentInput = form.elements.namedItem('content') as HTMLInputElement;

        let createCommentData = {
            "content": contentInput.value,
            "post": `${postdetail.id}`
        };

        let res = await fetch('https://linked-posts.routemisr.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${localStorage.getItem('usertoken')}`
            },
            body: JSON.stringify(createCommentData)
        });

        if (!res.ok) {
            console.error('Network response was not ok', res.statusText);
            return;
        }

        let data = await res.json();
        postComments(postdetail.id)
       form.content.value = null;
    }

    const removeComment = async (cId: any) => {
        let res = await fetch(`https://linked-posts.routemisr.com/comments/${cId}`, {
            method: 'DELETE',
            headers: {
                token: `${localStorage.getItem('usertoken')}`
            }
        });
        interface comment{
            _id:any
        }
        let data = await res.json();
        let filtered = commentContainer?.filter((comment:comment) => comment?._id !== cId)
        setCommentContainer(filtered)
    };

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const content = form.elements.namedItem('content') as HTMLInputElement;

        if (!content.value) {
            console.error('Content is required');
            return;
        }

        const contentData = {
            content: content.value,
        };

        try {
            const res = await fetch(`https://linked-posts.routemisr.com/comments/${commentid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${localStorage.getItem('usertoken')}`
                },
                body: JSON.stringify(contentData)
            });
            const data = await res.json();
            postComments(postdetail.id)
        } catch (error) {
            console.error('Error:', error);
        }
        form.content.value = null;
    };

    return (
        <Card className='min-h-[400px] w-[300px]' >
            <CardHeader
                avatar={
                    <Avatar src={postdetail?.user.photo} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={postdetail?.user.name}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={postdetail?.image}
                alt="Paella dish"
                className='h-[200px]'
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" className='line-clamp-1 hover:line-clamp-none transition-all'>
                    {postdetail?.body}
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
                        <div className='flex flex-row h-7 gap-3'>
                            <input type="text" className='border-orange-500 border-2 focus:border-orange-500 outline-none rounded-lg w-[90%] px-3' name='content' />
                            <button className='rounded-lg w-fit p-2 bg-orange-500 text-white text-sm flex items-center justify-center' type='submit'>Comment</button>
                        </div>
                    </form>
                    {commentContainer?.map((comment: any) => (
                        <Box key={comment._id} className='bg-[#f1f1f1] p-[5px] rounded-[10px] m-[2px]'>
                            <Box className="flex items-center">
                                <Avatar className='w-[30px] h-[30px]' src={comment.commentCreator.photo}></Avatar>
                                <h5 className={usernames === comment.commentCreator.name ? 'ml-[6px] font-bold text-blue-600' : 'ml-[6px]'}>
                                    {comment.commentCreator.name}
                                </h5>
                            </Box>
                            <Typography paragraph sx={{ marginTop: 2 }}>
                                {usernames === comment?.commentCreator?.name ? (
                                    <div className='flex flex-row justify-between items-center'>
                                        {comment.content}
                                        <button onClick={() => { removeComment(comment._id); }} className='w-fit text-white p-1 bg-red-500 mb-2'>Delete</button>
                                    </div>
                                ) : comment.content}
                                {usernames === comment?.commentCreator?.name ? (
                                    <form className='mb-3' onSubmit={handleSubmit2}>
                                        <div className='flex flex-row h-7 gap-3'>
                                            <input type="text" className='border-orange-500 border-2 focus:border-orange-500 outline-none rounded-lg w-[90%] px-3' name='content' />
                                            <button onClick={() => { setCommentid(comment._id); }} className='rounded-lg w-fit p-2 bg-yellow-500 text-white text-sm flex items-center justify-center' type='submit'>Update</button>
                                        </div>
                                    </form>
                                ) : null}
                            </Typography>
                        </Box>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
}
