import Swal from "sweetalert2";

export const openNotificationModal = (
  notifications,
  addNotification
) => {
  Swal.fire({
    width: 650,
    showConfirmButton: false,
    background: "transparent",

    html: `
      <div
        style="
          background:white;
          border-radius:32px;
          overflow:hidden;
        "
      >

        <div
          style="
            padding:24px;
            background:
            linear-gradient(
              135deg,
              #3b82f6,
              #6366f1
            );
            color:white;
          "
        >
          <h2
            style="
              margin:0;
              font-size:24px;
            "
          >
            🔔 Thông báo
          </h2>
        </div>

        <div
          id="notification-list"
          style="
            padding:20px;
            max-height:400px;
            overflow:auto;
          "
        >
          ${
            notifications.length
              ? notifications
                  .map(
                    (item) => `
              <div
                style="
                  border:1px solid #eee;
                  border-radius:16px;
                  padding:14px;
                  margin-bottom:10px;
                "
              >
                <div
                  style="
                    font-weight:700;
                  "
                >
                  ${item.title}
                </div>

                <div
                  style="
                    color:#6b7280;
                    margin-top:5px;
                  "
                >
                  ${item.content}
                </div>
              </div>
            `
                  )
                  .join("")
              : `
                <div>
                  Chưa có thông báo
                </div>
              `
          }
        </div>

        <div
          style="
            padding:20px;
            border-top:1px solid #eee;
          "
        >
          <button
            id="addNotification"
            style="
              width:100%;
              height:50px;
              border:none;
              border-radius:16px;
              background:#3b82f6;
              color:white;
              font-weight:700;
            "
          >
            ➕ Thêm thông báo
          </button>
        </div>

      </div>
    `,

    didOpen: () => {
      document
        .getElementById(
          "addNotification"
        )
        ?.addEventListener(
          "click",
          async () => {
            const result =
              await Swal.fire({
                title:
                  "Tạo thông báo",

                html: `
                  <input
                    id="title"
                    class="swal2-input"
                    placeholder="Tiêu đề"
                  />

                  <textarea
                    id="content"
                    class="swal2-textarea"
                    placeholder="Nội dung"
                  ></textarea>
                `,

                preConfirm: () => ({
                  title:
                    document.getElementById(
                      "title"
                    ).value,

                  content:
                    document.getElementById(
                      "content"
                    ).value,
                }),
              });

            if (
              result.isConfirmed
            ) {
              addNotification(
                result.value.title,
                result.value.content
              );
            }
          }
        );
    },
  });
};