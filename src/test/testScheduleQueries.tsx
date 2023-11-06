import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {GET_BT_DATE_INFO} from '../api/queryList';
import GetBTDateInfo from '../components/Schedule/scheduleQueries';

const mocks = [];

