public class ChangePasswordRequest
{
    public int Id { get; set; }
    public required string OldPassword { get; set; }
    public required string NewPassword { get; set; }
    public required string ConfirmNewPassword { get; set; }
}