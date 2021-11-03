import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { socialApi } from '../../../__fake-api__/social-api';
import { SocialPostAdd } from '../../../components/dashboard/social/social-post-add';
import { SocialPostCard } from '../../../components/dashboard/social/social-post-card';
import { withAuthGuard } from '../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../hooks/use-mounted';
import { gtm } from '../../../lib/gtm';

const SocialFeed = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const data = await socialApi.getFeed();

      if (isMounted()) {
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Social Feed | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 3 }}>
            <Typography
              color="textSecondary"
              variant="overline"
            >
              Social Feed
            </Typography>
            <Typography variant="h4">
              Here&apos;s what your connections posted
            </Typography>
          </Box>
          <SocialPostAdd />
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{ mt: 3 }}
            >
              <SocialPostCard
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(SocialFeed));
