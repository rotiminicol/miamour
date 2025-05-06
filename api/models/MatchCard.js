import mongoose from 'mongoose';

const matchCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Basic Information
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  
  // Profile Pictures
  pictures: [{
    url: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],

  // Personal Details
  profession: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true,
    enum: ['highSchool', 'bachelors', 'masters', 'phd', 'other']
  },
  religion: {
    type: String,
    required: true
  },
  familyBackground: String,
  hobbies: [String],
  relationshipStatus: {
    type: String,
    required: true,
    enum: ['single', 'divorced', 'widowed', 'separated']
  },
  previousMarriages: {
    type: String,
    enum: ['0', '1', '2', '3+']
  },
  divorceDetails: String,
  hasChildren: {
    type: String,
    required: true,
    enum: ['yes', 'no']
  },
  numberOfChildren: {
    type: String,
    enum: ['1', '2', '3', '4', '5+']
  },
  childrenAges: String,
  livingArrangement: {
    type: String,
    enum: ['fullTime', 'partTime', 'visitOnly', 'adult', 'other']
  },

  // Partner Preferences
  partnerAgeRange: {
    type: String,
    required: true
  },
  partnerLocationPreference: String,
  partnerReligionPreference: {
    type: String,
    required: true
  },
  partnerEducationPreference: {
    type: String,
    enum: ['highSchool', 'bachelors', 'masters', 'phd', 'noPreference']
  },
  acceptPartnerWithChildren: {
    type: String,
    enum: ['yes', 'no', 'maybe']
  },
  dealBreakers: String,
  marriageTimeframe: {
    type: String,
    required: true,
    enum: ['0-6months', '6-12months', '1-2years', '2+years']
  },

  // Matching Status
  status: {
    type: String,
    enum: ['pending', 'matching', 'matched', 'completed'],
    default: 'pending'
  },
  matches: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    compatibilityScore: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Privacy Settings
  privacyLevel: {
    type: String,
    enum: ['blossom', 'harmony', 'forever'],
    required: true
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
matchCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const MatchCard = mongoose.model('MatchCard', matchCardSchema);

export default MatchCard; 