using ExtendEverything.Data;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;

namespace ExtendEverything.NotificationHandler;

public class RunExtendEverythingSettingsMigrations : INotificationAsyncHandler<UmbracoApplicationStartingNotification> {
    private readonly ExtendEverythingContext _extendEverythingContext;
    private readonly IRuntimeState _runtimeState;

    public RunExtendEverythingSettingsMigrations(ExtendEverythingContext extendEverythingContext, IRuntimeState runtimeState) {
        _extendEverythingContext = extendEverythingContext;
        _runtimeState = runtimeState;
    }

    public async Task HandleAsync(UmbracoApplicationStartingNotification notification, CancellationToken cancellationToken) {
        if(_runtimeState.Level < RuntimeLevel.Run) {
            return;
        }

        var pendingMigrations = await _extendEverythingContext.Database.GetPendingMigrationsAsync(cancellationToken);

        if(!pendingMigrations.Any()) {
            return;
        }

        await _extendEverythingContext.Database.MigrateAsync(cancellationToken);
    }
}
