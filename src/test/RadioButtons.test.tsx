import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; //Extends Jest matchers witch matchers provided by the jest-dom library. the code uses the matcher "toBeChecked".
import RadioButtons from "../components/RadioButtons";

describe("RadioButtons Component", () => {
    //Snapshot test for correct rendering
    it("renders correctly", () => { 
        const component = renderer.create( //generates virtual represnetation of the component
            <RadioButtons
                options={["Edit", "View"]}
                name={"editOrView"}
                defaultCheckedOption="View"
            ></RadioButtons>
        );
        const tree = component.toJSON();//generates snapshot 
        expect(tree).toMatchSnapshot();//compares the snapshot with a previously stored snapshot
    });

    //Change test using render, fireevent and screen. 
    it("changes correctly", () => {
        const options = ["Option 1", "Option 2", "Option 3"];
        const defaultCheckedOption = "Option 1";

        render( // render component in div-container appended to document.body
            <RadioButtons
                options={options}
                name="radioGroup"
                defaultCheckedOption={defaultCheckedOption}
            />
        );

        // Get radio buttons by their labels. screen has every type of query used to find elements on the page (what page exactly?), including getBtLabelText
        const option1 = screen.getByLabelText("Option 1");
        const option2 = screen.getByLabelText("Option 2");
        const option3 = screen.getByLabelText("Option 3");

        // Check the initial state
        expect(option1).toBeChecked();
        expect(option2).not.toBeChecked();
        expect(option3).not.toBeChecked();

        // Simulate clicking Option 2
        fireEvent.click(option2);

        //Check the updated state
        expect(option1).not.toBeChecked();
        expect(option2).toBeChecked();
        expect(option3).not.toBeChecked();
    });
});
