import { MockedProvider} from "@apollo/client/testing";
import GetBladeTaskDateInfo from "../components/Schedule/scheduleQueries";
import { act } from "react-dom/test-utils";
import {mount} from 'enzyme';
import {successfulAllBTDateDataMock} from './mocks/scheduleQueriesMOCK';

it("Fetches Correctly Formatted Data", async() =>{
  let wrapper;
  await act(async () => {
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={[successfulAllBTDateDataMock]}>
        {GetBladeTaskDateInfo}
      </MockedProvider>
    )
  });
})