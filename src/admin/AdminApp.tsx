import { Route, HashRouter, Routes } from "react-router-dom";
import { AnalyticsPage } from "@/admin/pages/AnalyticsPage";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { ArtistsManagementPage } from "@/admin/pages/ArtistsManagementPage";
import { BookingsPage } from "@/admin/pages/BookingsPage";
import { ContactSubmissionsPage } from "@/admin/pages/ContactSubmissionsPage";
import { GalleryManagementPage } from "@/admin/pages/GalleryManagementPage";
import { GoogleReviewsPage } from "@/admin/pages/GoogleReviewsPage";
import { LoginPage } from "@/admin/pages/LoginPage";
import { OverviewPage } from "@/admin/pages/OverviewPage";
import { PlaceholderPage } from "@/admin/pages/PlaceholderPage";
import { SettingsPage } from "@/admin/pages/SettingsPage";
import { ServicesManagementPage } from "@/admin/pages/ServicesManagementPage";
import { TattooSchoolCmsPage } from "@/admin/pages/TattooSchoolCmsPage";
import { AuthProvider } from "@/admin/providers/AuthProvider";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";

export default function AdminApp() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/contacts" element={<ContactSubmissionsPage />} />
              <Route path="/gallery" element={<GalleryManagementPage />} />
              <Route path="/reviews" element={<GoogleReviewsPage />} />
              <Route path="/services" element={<ServicesManagementPage />} />
              <Route path="/artists" element={<ArtistsManagementPage />} />
              <Route path="/school" element={<TattooSchoolCmsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="*"
                element={
                  <PlaceholderPage
                    title="Page not found"
                    description="This dashboard route is not available yet. Return to the overview and continue managing the studio."
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
