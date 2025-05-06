import userRoutes from './api/routes/userRoutes.js';
import gettingStartedRoutes from './api/routes/gettingStartedRoutes.js';
import notificationRoutes from './api/routes/notificationRoutes.js';

// Routes
app.use('/api/users', userRoutes);
app.use('/api/getting-started', gettingStartedRoutes);
app.use('/api/notifications', notificationRoutes); 