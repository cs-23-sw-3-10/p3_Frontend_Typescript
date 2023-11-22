import StyledButton from "../ui/styledButton";

function CreateAdditionalContent() {
    return (
        <div className="AdditionalContent">
            <div className="buttonContainer">
                <StyledButton
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                        console.log("button was clicked");
                    }}
                >
                    Create Blade Project
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        console.log("button was clicked");
                    }}
                >
                    Create Blade Task
                </StyledButton>
            </div>
        </div>
    );
}
export default CreateAdditionalContent;
