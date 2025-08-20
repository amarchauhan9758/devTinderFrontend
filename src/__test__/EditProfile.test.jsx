import { Provider } from "react-redux";
import EditProfile from "./../components/EditProfile";
import {
  render,
  fireEvent,
  getAllByRole,
  screen,
} from "@testing-library/react";
import appStore from "../components/utils/strore/appStore";
import mockUser from "../../mockData/mockfile.json";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

it("shoulde render my editProdile", () => {
  render(
    <Provider store={appStore}>
      <EditProfile user={mockUser} />
    </Provider>
  );
  console.log(mockUser.firstName);
  const input = screen.getByText("sachin Chauhan");
  expect(input).toBeInTheDocument();
});
