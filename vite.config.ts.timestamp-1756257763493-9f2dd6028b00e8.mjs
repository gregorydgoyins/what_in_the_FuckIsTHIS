// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "health-check-upgraded",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
          next();
        });
        server.middlewares.use("/health", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            status: "healthy",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || "1.0.0",
            environment: process.env.NODE_ENV || "development"
          }));
        });
        server.middlewares.use("/api/status", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            server: "running",
            hash: "enabled",
            routes: "active",
            assets: "loaded"
          }));
        });
        server.middlewares.use((err, _req, res, next) => {
          if (err) {
            console.error("Server error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: "Internal Server Error",
              message: process.env.NODE_ENV === "development" ? err.message : "An error occurred",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }));
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: Number(process.env.VITE_PORT) || 4173,
    open: true,
    strictPort: false,
    cors: true,
    host: true
  },
  preview: {
    port: 4173,
    open: true,
    strictPort: false,
    cors: true,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHR5cGUgeyBDb25uZWN0IH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ2hlYWx0aC1jaGVjay11cGdyYWRlZCcsXG4gICAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcTogQ29ubmVjdC5JbmNvbWluZ01lc3NhZ2UsIHJlczogQ29ubmVjdC5TZXJ2ZXJSZXNwb25zZSwgbmV4dDogQ29ubmVjdC5OZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgWyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfV0gJHtyZXEubWV0aG9kfSAke3JlcS51cmx9YCk7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvaGVhbHRoJywgKF9yZXE6IENvbm5lY3QuSW5jb21pbmdNZXNzYWdlLCByZXM6IENvbm5lY3QuU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc3RhdHVzOiAnaGVhbHRoeScsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIHVwdGltZTogcHJvY2Vzcy51cHRpbWUoKSxcbiAgICAgICAgICAgIG1lbW9yeTogcHJvY2Vzcy5tZW1vcnlVc2FnZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvbiB8fCAnMS4wLjAnLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCdcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvc3RhdHVzJywgKF9yZXE6IENvbm5lY3QuSW5jb21pbmdNZXNzYWdlLCByZXM6IENvbm5lY3QuU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc2VydmVyOiAncnVubmluZycsXG4gICAgICAgICAgICBoYXNoOiAnZW5hYmxlZCcsXG4gICAgICAgICAgICByb3V0ZXM6ICdhY3RpdmUnLFxuICAgICAgICAgICAgYXNzZXRzOiAnbG9hZGVkJ1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgoZXJyOiBFcnJvciwgX3JlcTogQ29ubmVjdC5JbmNvbWluZ01lc3NhZ2UsIHJlczogQ29ubmVjdC5TZXJ2ZXJSZXNwb25zZSwgbmV4dDogQ29ubmVjdC5OZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2ZXIgZXJyb3I6JywgZXJyKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgICAgICAgICAgICAgbWVzc2FnZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBlcnIubWVzc2FnZSA6ICdBbiBlcnJvciBvY2N1cnJlZCcsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuVklURV9QT1JUKSB8fCA0MTczLFxuICAgIG9wZW46IHRydWUsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgY29yczogdHJ1ZSxcbiAgICBob3N0OiB0cnVlXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA0MTczLFxuICAgIG9wZW46IHRydWUsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgY29yczogdHJ1ZSxcbiAgICBob3N0OiB0cnVlXG4gIH1cbn0pXG5cbi8vIEFkZCB0aGlzIHRvIHlvdXIgVGFpbHdpbmQgY29uZmlnIHRvIGVuYWJsZSBtYXJxdWVlIGFuaW1hdGlvblxuLy8gdGFpbHdpbmQuY29uZmlnLnRzIG9yIHRhaWx3aW5kLmNvbmZpZy5qc1xuLy8gdGhlbWUuZXh0ZW5kLmtleWZyYW1lcy50aWNrZXIgYW5kIHRoZW1lLmV4dGVuZC5hbmltYXRpb24udGlja2VyXG4vLyBUaGVuIHVzZSBjbGFzcz1cImFuaW1hdGUtdGlja2VyXCIgaW4geW91ciBIVE1MXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLFFBQVE7QUFDdEIsZUFBTyxZQUFZLElBQUksQ0FBQyxLQUE4QixLQUE2QixTQUErQjtBQUNoSCxrQkFBUSxJQUFJLEtBQUksb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQyxLQUFLLElBQUksTUFBTSxJQUFJLElBQUksR0FBRyxFQUFFO0FBQ3BFLGVBQUs7QUFBQSxRQUNQLENBQUM7QUFFRCxlQUFPLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBK0IsUUFBZ0M7QUFDaEcsY0FBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsY0FBSSxJQUFJLEtBQUssVUFBVTtBQUFBLFlBQ3JCLFFBQVE7QUFBQSxZQUNSLFlBQVcsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxZQUNsQyxRQUFRLFFBQVEsT0FBTztBQUFBLFlBQ3ZCLFFBQVEsUUFBUSxZQUFZO0FBQUEsWUFDNUIsU0FBUyxRQUFRLElBQUksdUJBQXVCO0FBQUEsWUFDNUMsYUFBYSxRQUFRLElBQUksWUFBWTtBQUFBLFVBQ3ZDLENBQUMsQ0FBQztBQUFBLFFBQ0osQ0FBQztBQUVELGVBQU8sWUFBWSxJQUFJLGVBQWUsQ0FBQyxNQUErQixRQUFnQztBQUNwRyxjQUFJLFVBQVUsZ0JBQWdCLGtCQUFrQjtBQUNoRCxjQUFJLElBQUksS0FBSyxVQUFVO0FBQUEsWUFDckIsUUFBUTtBQUFBLFlBQ1IsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLFlBQ1IsUUFBUTtBQUFBLFVBQ1YsQ0FBQyxDQUFDO0FBQUEsUUFDSixDQUFDO0FBRUQsZUFBTyxZQUFZLElBQUksQ0FBQyxLQUFZLE1BQStCLEtBQTZCLFNBQStCO0FBQzdILGNBQUksS0FBSztBQUNQLG9CQUFRLE1BQU0saUJBQWlCLEdBQUc7QUFDbEMsZ0JBQUksYUFBYTtBQUNqQixnQkFBSSxJQUFJLEtBQUssVUFBVTtBQUFBLGNBQ3JCLE9BQU87QUFBQSxjQUNQLFNBQVMsUUFBUSxJQUFJLGFBQWEsZ0JBQWdCLElBQUksVUFBVTtBQUFBLGNBQ2hFLFlBQVcsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxZQUNwQyxDQUFDLENBQUM7QUFDRjtBQUFBLFVBQ0Y7QUFDQSxlQUFLO0FBQUEsUUFDUCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFNBQVMsS0FBSztBQUFBLElBQ3ZDLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
