package integration;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;

public class UsersTest extends CommonUITest {

    @BeforeEach
    void login(){
        Selenide.clearBrowserLocalStorage();
        Configuration.timeout = 10_000;
        $("#email").sendKeys("admin");
        $("#password").sendKeys("pass");
        $(byText("Login")).click();
        $(byText("Admin")).shouldBe(visible);
    }

    @AfterEach
    void logout(){
        $(byText("Logout")).click();
        $(byText("Login")).shouldBe(visible);
    }

    @Test
    void adminCanCreateAndDeleteUser() {
        $(byText("Admin")).click();
        $(byText("Add User")).shouldBe(enabled).click();
        $("#username").sendKeys("Check creating user");
        $("#password").sendKeys("pass");
        $(byText("Add")).click();
        $$("tr")
                .findBy(textCaseSensitive("Check creating user"))
                .shouldBe(visible);
        $(byText("Check creating user"))
                .closest("tr")
                .find("button").shouldHave(text("Delete"))
                .shouldHave(enabled)
                .click();
        $(byText("Yes")).click();
        $$("tr")
                .findBy(textCaseSensitive("Check creating user"))
                .shouldNotBe(exist);
    }

    @Test
    void adminCanNotDeleteYourself() {
        $(byText("Admin")).click();
        $(byText("admin"))
                .closest("tr")
                .find("button").shouldHave(text("Delete"))
                .shouldBe(disabled);
    }

    @Test
    void adminCanNotCreateUserWithNameWhichIsAlreadyExists() {
        $(byText("Admin")).click();
        $(byText("Add User")).click();
        $("#username").sendKeys("user");
        $("#password").sendKeys("pass");
        $(byText("Add")).click();
        $(byText("User with name 'user' already exists!"));
        $(".close.icon").click();

    }

    @Test
    void userCreatedByAdminCanLoginAndNotSeeAdminPage() {
        $(byText("Admin")).click();
        $(byText("Add User")).click();
        $("#username").sendKeys("User created by admin");
        $("#password").sendKeys("pass");
        $(byText("Add")).click();
        $(byText("User created by admin")).shouldBe(visible);
        $(byText("Logout")).click();
        $(byText("Login")).shouldBe(visible);
        $("#email").sendKeys("User created by admin");
        $("#password").sendKeys("pass");
        $(byText("Login")).click();
        $(byText("Admin")).shouldNotBe(visible);
    }

}
