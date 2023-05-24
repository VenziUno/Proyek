<div
      class="relative w-full bg-yellow-500 text-black shadow flex flex-col gap-14 px-6 py-6 rounded-lg h-[calc(100vh-32px)] max-w-[256px]"
    >
      <div class="space-y-4">
        <div class="flex text-3xl justify-center items-center space-x-4">
          <img
            class="w-16 h-16"
            src="logo.png"
            alt="logo"
            title="logo"
            width={250}
            height={250}
          />
          <div>LOGO</div>
        </div>
        <div class="space-y-2">
          {{-- {menus.map((menu, index) => {
            return (
              <div class="outline-none relative" key={index}>
                {menu.subMenu ? (
                  <button
                    onClick={handleShowDropDownMenu}
                    class="w-full px-3 py-2 rounded  bg-yellow-300"
                  >
                    <div class="flex items-center rounded justify-between">
                      <div class="flex space-x-2 items-center">
                        <div>{menu.icon}</div>
                        <div>{menu.name}</div>
                      </div>
                      {dropDownMenu ? <AiOutlineDown /> : <AiOutlineUp />}
                    </div>
                  </button>
                ) : (
                  <Link href={menu.route}>
                    <div class="flex items-center px-3 py-2 rounded justify-between bg-yellow-300">
                      <div class="flex space-x-2 items-center">
                        <div>{menu.icon}</div>
                        <div>{menu.name}</div>
                      </div>
                    </div>
                  </Link>
                )}
                {menu.subMenu && dropDownMenu && (
                  <div class="h-fit  w-full mt-1 bg-yellow-200 rounded py-2">
                    {menu.subMenu.map((submenu, index) => {
                      return (
                        <Link href={submenu.route} key={index}>
                          <div class="flex space-x-2 items-center px-9 py-2 hover:bg-yellow-300">
                            <div>{submenu.name}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })} --}}
          <div class="outline-none relative">
            <div class="flex items-center px-3 py-2 rounded justify-between bg-yellow-300">
              <div class="flex space-x-2 items-center">
                <div>
                  {{-- <AiOutlineLogout /> --}}
                </div>
                <div>Dashboard</div>
              </div>
            </div>
          </div>
          <div class="outline-none relative">
            <div class="flex items-center px-3 py-2 rounded justify-between bg-yellow-300">
              <div class="flex space-x-2 items-center">
                <div>
                  {{-- <AiOutlineLogout /> --}}
                </div>
                <div>Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
