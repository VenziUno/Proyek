<div class="w-full overflow-hidden">
    {{-- {notification.show && (
      <Notifikasi
        type={notification.type}
        description={notification.message}
      />
    )}
    {deleteItem.show && (
      <CardNotif
        type="delete"
        title="Are you sure you want to Delete this data?"
      />
    )} --}}
    <div class="flex flex-row gap-4 p-4 w-full ">
        <x-layout.sidebar.index />
      <div class="flex flex-col flex-grow h-full  ">
        <x-layout.header.index />
        <div class="w-full h-full pt-5 ">
          <div
            class="bg-white rounded-lg shadow scrollbar-thin scrollbar-thumb-primary-500 scrollbar-thumb-rounded overflow-y-auto"
            {{-- style={{ height: "calc(100vh - 152px)" }} --}}
          >
          </div>
        </div>
      </div>
    </div>
  </div>
