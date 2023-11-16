import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom'

import { testTableLogic } from './testTableLogic';

/**
 * Write npm test in the terminal to run the tests
 */
testTableLogic();
