import { MoonStar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { deleteAllForUser } from "../utils/supabase";
import { useRefreshQueries } from "../utils/queries";

export const Header = () => {
  const themeContext = useTheme();
  const authContext = useAuth();
  const refresh = useRefreshQueries();

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-base-300">
      <div />
      <div className="text-center font-extrabold">ACT Advisor</div>
      <div className="flex items-center justify-self-end">
        <div className="flex mx-2 text-center">
          {authContext.user && (
            <button
              className="btn btn-error"
              onClick={() => {
                deleteAllForUser(authContext.user?.id).then(() => {
                  refresh();
                });
              }}
            >
              DELETE ALL DATA
            </button>
          )}
        </div>
        <div className="flex mx-2 text-center">
          {authContext.user && (
            <button className="btn btn-ghost" onClick={authContext.signOut}>
              Sign Out
            </button>
          )}
        </div>
        <label className="flex cursor-pointer gap-2">
          <MoonStar />
          <input
            className="toggle toggle-lg mx-2"
            type="checkbox"
            checked={themeContext?.isDarkMode}
            onChange={() =>
              themeContext?.setIsDarkMode(!themeContext?.isDarkMode)
            }
          />
          <MoonStar />
        </label>
      </div>
    </div>
  );
};
