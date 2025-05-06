const User = require('../models/User');
const { createNotification } = require('./notificationController');

exports.updateGettingStartedStep = async (req, res) => {
  try {
    const { step } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { gettingStartedStep: step } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create notification based on the step
    let notificationTitle, notificationMessage;
    switch (step) {
      case 1:
        notificationTitle = 'Getting Started';
        notificationMessage = 'Welcome to miamour! Let\'s begin your journey to finding love.';
        break;
      case 2:
        notificationTitle = 'Profile Creation';
        notificationMessage = 'Great job! You\'ve completed your basic profile.';
        break;
      case 3:
        notificationTitle = 'Preferences Set';
        notificationMessage = 'Your preferences have been saved. We\'ll use these to find your perfect match.';
        break;
      case 4:
        notificationTitle = 'Profile Complete';
        notificationMessage = 'Congratulations! Your profile is now complete. Start exploring matches!';
        break;
      default:
        notificationTitle = 'Progress Update';
        notificationMessage = 'You\'ve made progress in your getting started journey.';
    }

    await createNotification(
      req.user._id,
      notificationTitle,
      notificationMessage,
      'getting_started',
      '/getting-started'
    );

    res.json(user);
  } catch (error) {
    console.error('Error updating getting started step:', error);
    res.status(500).json({ message: 'Error updating getting started step' });
  }
}; 