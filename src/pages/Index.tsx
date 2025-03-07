import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Index = () => {
    return (
        <>
            <h1>🏠 Welcome to the Dashboard</h1>
            <p>Demo Dashboard</p>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Total Projects
                            </Typography>
                            <Typography variant="body2">
                                10
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Active Sprints
                            </Typography>
                            <Typography variant="body2">
                                5
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Completed Sprints
                            </Typography>
                            <Typography variant="body2">
                                3
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Index;
