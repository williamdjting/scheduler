import React from "react";
/* somewhere near the top */
import axios from "axios";
import { render, cleanup } from "@testing-library/react";
import { getByText } from "@testing-library/react";
import waitForElement from "@testing-library/react";
import Application from "components/Application";
import fireEvent from "@testing-library/react";
import prettyDOM from "@testing-library/react";
import getAllByTestId from "@testing-library/react";

afterEach(cleanup);

// xit("renders without crashing", () => {
//   render(<Application />);
// });
// prettyDOM(container);
// console.log(prettyDOM(container));

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Please confirm you would like to delete")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the Archie Cohen appointment.
  const appointment = getAllByTestId(container, "appointment")[1];
  fireEvent.click(getByAltText(appointment, "Edit"))

  // Change name and interviewer
  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: "Bob the Builder" }
  });
  fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

  // 4. Click the "Save" button on the 'Save' container".
  fireEvent.click(getByText(appointment, "Save"))

  await waitForElement(() => getByAltText(appointment, "Edit"));
  // 6. Confirm that the Apt container is able to be edited.
  expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

  // 7. Compare the value of spots remaining to equal 1.
  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  expect(queryByText(monday, "1 spot remaining")).toBeInTheDocument();
  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    // debug();

    await waitForElement(() => getByText(container, "Archie Cohen"))

    // Returns an array of items matching testID
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // Check that the put fails within Axios
    await waitForElement(() => getByText(appointment, /There was an error while saving!/i))
    expect(getByText(appointment, /There was an error while saving!/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the Archie Cohen appointment.
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"))

    // / Check that the confirmation message is shown.
    // Get by text will actually wait while query will just return null
    await waitForElement(() => getByText(appointment, "Are you sure you want to Cancel?"));
    expect(getByText(appointment, "Are you sure you want to Cancel?")).toBeInTheDocument();

    // 4. Click the "Confirm" button on the 'Confirm' container".
    fireEvent.click(getByText(appointment, "Confirm"))


    // Check that the put fails within Axios


    await waitForElement(() => getByText(appointment, /There was an error while saving!/i))
    expect(getByText(appointment, /There was an error while saving!/i)).toBeInTheDocument();
});

});
