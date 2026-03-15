import { MoonStar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { deleteAllForUser } from "../utils/supabase";
import { useRefreshQueries } from "../utils/queries";

export const Header = () => {
  const themeContext = useTheme();
  const authContext = useAuth();
  const refresh = useRefreshQueries();

  console.log(themeContext, authContext, refresh, deleteAllForUser, MoonStar);

  return (
    <div className="navbar bg-base-300">
      <div className="text-lg font-bold flex-1">Act Advisor</div>
      <label className="flex cursor-pointer items-center gap-2">
        <MoonStar size={16} />
        <input
          className="toggle toggle-sm sm:toggle-md mx-1"
          type="checkbox"
          checked={themeContext?.isDarkMode}
          onChange={() =>
            themeContext?.setIsDarkMode(!themeContext?.isDarkMode)
          }
        />
        <MoonStar size={16} />
      </label>
      {authContext.user && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>More</summary>
                <ul className="bg-base-300 rounded-t-none p-2">
                  <li>
                    <a
                      onClick={() => {
                        deleteAllForUser(authContext.user?.id).then(() => {
                          refresh();
                        });
                      }}
                    >
                      Clear data
                    </a>
                  </li>
                  <li>
                    <a onClick={authContext.signOut}>Sign out</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
