import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import { loginAction } from "../_actions/login";
import { LoginPage } from "./login-page";

vi.mock("../_actions/login", () => ({
  loginAction: vi.fn().mockResolvedValue({ success: true }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("タイトルが表示されている", async () => {
  render(<LoginPage />);
  expect(screen.getByText("管理画面ログイン")).toBeInTheDocument();
});

test("入力の初期状態は空", () => {
  render(<LoginPage />);

  expect(screen.getByRole("textbox", { name: /^メールアドレス$/ })).toHaveValue(
    "",
  );
  expect(screen.getByLabelText(/^パスワード$/)).toHaveValue("");
});

test.each([
  {
    email: "a",
    password: "12345",
    messages: [
      "メールアドレスの形式で入力してください",
      "パスワードは6文字以上で入力してください",
    ],
  },
  {
    email:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com",
    password:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    messages: [
      "メールアドレスは255文字以内で入力してください",
      "パスワードは255文字以内で入力してください",
    ],
  },
])(
  "不正な入力でバリデーション失敗のメッセージが表示され、ログイン処理が呼び出されない %s",
  async ({ email, password, messages }) => {
    render(<LoginPage />);

    await userEvent.type(
      screen.getByRole("textbox", { name: /^メールアドレス$/ }),
      email,
    );
    await userEvent.type(screen.getByLabelText(/^パスワード$/), password);
    await userEvent.click(screen.getByRole("button", { name: /^ログイン$/ }));

    for (const message of messages) {
      expect(screen.getByText(message)).toBeInTheDocument();
    }
  },
);

test("未入力の場合バリデーション失敗のメッセージが表示され、ログイン処理が呼び出されない", async () => {
  render(<LoginPage />);

  await userEvent.click(screen.getByRole("button", { name: /^ログイン$/ }));

  expect(loginAction).not.toHaveBeenCalled();

  expect(
    screen.getByText("メールアドレスを入力してください"),
  ).toBeInTheDocument();
});

test("フォーム内容もとにログイン処理が呼び出される", async () => {
  render(<LoginPage />);

  await userEvent.type(
    screen.getByRole("textbox", { name: /^メールアドレス$/ }),
    "a@example.com",
  );
  await userEvent.type(screen.getByLabelText(/^パスワード$/), "123456");
  await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

  expect(loginAction).toHaveBeenCalledWith({
    email: "a@example.com",
    password: "123456",
  });
});

test("ログイン失敗した場合、エラーメッセージを表示する", async () => {
  const message = "ログインに失敗しました";
  vi.mocked(loginAction).mockResolvedValueOnce({ success: false, message });

  render(<LoginPage />);

  await userEvent.type(
    screen.getByRole("textbox", { name: /^メールアドレス$/ }),
    "a@example.com",
  );
  await userEvent.type(screen.getByLabelText(/^パスワード$/), "123456");
  await userEvent.click(screen.getByRole("button", { name: /^ログイン$/ }));

  expect(await screen.findByText(message)).toBeInTheDocument();
});
