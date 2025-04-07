const mongoose = require('mongoose');

const intakeFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  howDidYouHearAboutUs: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContactPhone: {
    type: String,
    required: true,
    trim: true
  },
  lastManicure: {
    type: String,
    required: true,
    trim: true
  },
  manicureFrequency: {
    type: String,
    required: true,
    trim: true
  },
  handFootNailProducts: {
    type: String,
    required: true,
    trim: true
  },
  nailPolishLasts: {
    type: String,
    required: true,
    trim: true
  },
  improveHandsFeetNails: {
    type: String,
    required: true,
    trim: true
  },
  hobbiesActivities: {
    type: String,
    required: true,
    trim: true
  },
  nailConditions: {
    type: String,
    required: true,
    trim: true
  },
  cuticles: {
    type: String,
    required: true,
    trim: true
  },
  handConditions: {
    type: String,
    required: true,
    trim: true
  },
  biteNails: {
    type: String,
    required: true,
    trim: true
  },
  nailInfection: {
    type: String,
    required: true,
    trim: true
  },
  nailInfectionInfo: {
    type: String,
    trim: true
  },
  healthConditions: {
    type: String,
    required: true,
    trim: true
  },
  healthConditionsInfo: {
    type: String,
    trim: true
  },
  pregnant: {
    type: String,
    required: true,
    trim: true
  },
  allergies: {
    type: String,
    required: true,
    trim: true
  },
  signature: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  printName: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const IntakeForm = mongoose.model('IntakeForm', intakeFormSchema);

module.exports = IntakeForm; 